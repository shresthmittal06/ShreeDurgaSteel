import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProduction = process.env.NODE_ENV === 'production';
const PORT = parseInt(process.env.PORT || '3000', 10);

const DATA_DIR = path.resolve(__dirname, 'data');
const PUBLISHED_CONTENT_FILE = path.join(DATA_DIR, 'site-content.json');
const DRAFT_CONTENT_FILE = path.join(DATA_DIR, 'draft-content.json');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const SESSIONS_FILE = path.join(DATA_DIR, 'sessions.json');

const PUBLIC_UPLOADS_DIR = path.resolve(__dirname, 'public', 'uploads');
const PUBLIC_PRODUCT_UPLOADS_DIR = path.resolve(PUBLIC_UPLOADS_DIR, 'products');
const PUBLIC_DOC_UPLOADS_DIR = path.resolve(PUBLIC_UPLOADS_DIR, 'documents');

const DIST_DIR = path.resolve(__dirname, 'dist');
const DIST_UPLOADS_DIR = path.resolve(DIST_DIR, 'uploads');
const DIST_PRODUCT_UPLOADS_DIR = path.resolve(DIST_UPLOADS_DIR, 'products');

// Ensure necessary directories exist
[
  DATA_DIR,
  PUBLIC_UPLOADS_DIR,
  PUBLIC_PRODUCT_UPLOADS_DIR,
  PUBLIC_DOC_UPLOADS_DIR,
].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Seed default Owner account if users file doesn't exist
const DEFAULT_OWNER_EMAIL = 'shresthmittal6@gmail.com';
if (!fs.existsSync(USERS_FILE)) {
  const initialUsers = [
    {
      email: DEFAULT_OWNER_EMAIL,
      role: 'owner',
      name: 'Shresth Mittal (Owner)',
      password: 'DurgaAdmin@2026',
      pin: '84450',
      createdAt: Date.now(),
    },
  ];
  fs.writeFileSync(USERS_FILE, JSON.stringify(initialUsers, null, 2), 'utf8');
}

// Ensure draft content exists by duplicating published content initially
if (fs.existsSync(PUBLISHED_CONTENT_FILE) && !fs.existsSync(DRAFT_CONTENT_FILE)) {
  try {
    fs.copyFileSync(PUBLISHED_CONTENT_FILE, DRAFT_CONTENT_FILE);
  } catch (e) {
    console.error('[Server] Failed to initialize draft file:', e);
  }
}

async function startServer() {
  const app = express();

  // Increase payload limit for high-resolution equipment photos and document uploads
  app.use(express.json({ limit: '60mb' }));
  app.use(express.urlencoded({ extended: true, limit: '60mb' }));

  // Dynamic content storage helpers
  function readPublishedContent(): any | null {
    try {
      if (fs.existsSync(PUBLISHED_CONTENT_FILE)) {
        const raw = fs.readFileSync(PUBLISHED_CONTENT_FILE, 'utf8');
        return JSON.parse(raw);
      }
    } catch (err) {
      console.error('[Server] Error reading site-content.json:', err);
    }
    return null;
  }

  function writePublishedContent(data: any): boolean {
    try {
      fs.writeFileSync(PUBLISHED_CONTENT_FILE, JSON.stringify(data, null, 2), 'utf8');
      return true;
    } catch (err) {
      console.error('[Server] Error writing site-content.json:', err);
      return false;
    }
  }

  function readDraftContent(): any | null {
    try {
      if (fs.existsSync(DRAFT_CONTENT_FILE)) {
        const raw = fs.readFileSync(DRAFT_CONTENT_FILE, 'utf8');
        return JSON.parse(raw);
      }
      return readPublishedContent();
    } catch (err) {
      console.error('[Server] Error reading draft-content.json:', err);
      return readPublishedContent();
    }
  }

  function writeDraftContent(data: any): boolean {
    try {
      fs.writeFileSync(DRAFT_CONTENT_FILE, JSON.stringify(data, null, 2), 'utf8');
      return true;
    } catch (err) {
      console.error('[Server] Error writing draft-content.json:', err);
      return false;
    }
  }

  // User & Session helpers
  function getUsers(): any[] {
    try {
      if (fs.existsSync(USERS_FILE)) {
        return JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
      }
    } catch (err) {
      console.error('[Server] Error reading users.json:', err);
    }
    return [];
  }

  function saveUsers(users: any[]) {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
  }

  // Active Sessions
  const activeSessions: Map<string, { email: string; role: string; name: string; expiresAt: number }> = new Map();

  function loadSessions() {
    try {
      if (fs.existsSync(SESSIONS_FILE)) {
        const list = JSON.parse(fs.readFileSync(SESSIONS_FILE, 'utf8'));
        list.forEach((s: any) => {
          if (s.expiresAt > Date.now()) {
            activeSessions.set(s.token, s);
          }
        });
      }
    } catch (e) {
      // ignore
    }
  }
  loadSessions();

  function saveSessions() {
    try {
      const arr = Array.from(activeSessions.entries()).map(([token, val]) => ({
        token,
        ...val,
      }));
      fs.writeFileSync(SESSIONS_FILE, JSON.stringify(arr, null, 2), 'utf8');
    } catch (e) {
      // ignore
    }
  }

  function createSession(user: { email: string; role: string; name: string }) {
    const token = 'sds_' + crypto.randomBytes(32).toString('hex');
    const expiresAt = Date.now() + 30 * 24 * 60 * 60 * 1000; // 30 days
    const sessionData = { email: user.email, role: user.role, name: user.name, expiresAt };
    activeSessions.set(token, sessionData);
    saveSessions();
    return token;
  }

  function getSessionUser(req: Request) {
    const authHeader = req.headers.authorization;
    let token = '';
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7).trim();
    } else if (req.headers['x-admin-token']) {
      token = String(req.headers['x-admin-token']).trim();
    } else if (req.query.token) {
      token = String(req.query.token).trim();
    }

    if (!token) return null;
    const session = activeSessions.get(token);
    if (!session) return null;
    if (session.expiresAt < Date.now()) {
      activeSessions.delete(token);
      saveSessions();
      return null;
    }
    return session;
  }

  // RBAC Middleware
  function requireAuth(allowedRoles: ('owner' | 'editor')[] = ['owner', 'editor']) {
    return (req: Request, res: Response, next: NextFunction) => {
      const user = getSessionUser(req);
      if (!user) {
        return res.status(401).json({
          error: 'Unauthorized: Editing controls are restricted to verified Owner/Admin or Editor accounts.',
        });
      }
      if (!allowedRoles.includes(user.role as any)) {
        return res.status(403).json({
          error: `Forbidden: This action requires one of [${allowedRoles.join(', ')}] permissions. Current role: ${user.role}`,
        });
      }
      (req as any).user = user;
      next();
    };
  }

  // Helper to persist base64 data to physical file on disk
  function saveBase64Image(dataUrl: string, prefix = 'upload'): string | null {
    try {
      const match = dataUrl.match(/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/);
      if (!match) return null;

      let ext = match[1].toLowerCase();
      if (ext === 'jpeg') ext = 'jpg';
      if (ext.includes('svg')) ext = 'svg';

      const base64Data = match[2];
      const buffer = Buffer.from(base64Data, 'base64');
      const filename = `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${ext}`;

      const publicPath = path.join(PUBLIC_PRODUCT_UPLOADS_DIR, filename);
      fs.writeFileSync(publicPath, buffer);

      // If dist exists, also copy into dist uploads for production static serving
      if (fs.existsSync(DIST_DIR)) {
        if (!fs.existsSync(DIST_PRODUCT_UPLOADS_DIR)) {
          fs.mkdirSync(DIST_PRODUCT_UPLOADS_DIR, { recursive: true });
        }
        fs.writeFileSync(path.join(DIST_PRODUCT_UPLOADS_DIR, filename), buffer);
      }

      return `/uploads/products/${filename}`;
    } catch (err) {
      console.error('[Server] Failed to save base64 image:', err);
      return null;
    }
  }

  // Static serving for persistent uploads
  app.use(
    '/uploads',
    (req: Request, res: Response, next: NextFunction) => {
      res.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=3600');
      next();
    },
    express.static(PUBLIC_UPLOADS_DIR),
    express.static(DIST_UPLOADS_DIR)
  );

  // Static serving for public images
  const publicImagesDir = path.resolve(__dirname, 'public', 'images');
  const distImagesDir = path.resolve(DIST_DIR, 'images');
  app.use(
    '/images',
    (req: Request, res: Response, next: NextFunction) => {
      res.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=3600');
      next();
    },
    express.static(publicImagesDir),
    express.static(distImagesDir)
  );

  // ==========================================
  // AUTHENTICATION & RBAC ROUTES
  // ==========================================

  // Login
  app.post('/api/auth/login', (req: Request, res: Response) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password/PIN are required' });
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const cleanPass = String(password).trim();

    const users = getUsers();
    const user = users.find(
      (u) => u.email.toLowerCase() === cleanEmail && (u.password === cleanPass || u.pin === cleanPass)
    );

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or credentials. Access denied.' });
    }

    const token = createSession({
      email: user.email,
      role: user.role,
      name: user.name || (user.role === 'owner' ? 'Owner / Admin' : 'Editor'),
    });

    res.json({
      success: true,
      token,
      user: {
        email: user.email,
        role: user.role,
        name: user.name || (user.role === 'owner' ? 'Owner / Admin' : 'Editor'),
      },
      message: `Welcome back, ${user.name || user.email}! Logged in as ${user.role.toUpperCase()}.`,
    });
  });

  // Get current user status
  app.get('/api/auth/me', (req: Request, res: Response) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
    const user = getSessionUser(req);
    if (!user) {
      return res.json({
        authenticated: false,
        user: null,
      });
    }
    res.json({
      authenticated: true,
      user: {
        email: user.email,
        role: user.role,
        name: user.name,
      },
    });
  });

  // Logout
  app.post('/api/auth/logout', (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7).trim();
      activeSessions.delete(token);
      saveSessions();
    }
    res.json({ success: true, message: 'Logged out successfully' });
  });

  // Manage Users (Owner Only)
  app.get('/api/auth/users', requireAuth(['owner']), (req: Request, res: Response) => {
    const users = getUsers().map((u) => ({
      email: u.email,
      role: u.role,
      name: u.name,
      createdAt: u.createdAt,
    }));
    res.json({ success: true, users });
  });

  app.post('/api/auth/users', requireAuth(['owner']), (req: Request, res: Response) => {
    const { email, role, name, password } = req.body;
    if (!email || !role || !password) {
      return res.status(400).json({ error: 'Email, role, and password are required' });
    }
    const cleanEmail = String(email).trim().toLowerCase();
    const users = getUsers();
    const existingIndex = users.findIndex((u) => u.email.toLowerCase() === cleanEmail);

    const newUserObj = {
      email: cleanEmail,
      role: role === 'owner' ? 'owner' : 'editor',
      name: name || (role === 'owner' ? 'Administrator' : 'Editor'),
      password: String(password).trim(),
      createdAt: Date.now(),
    };

    if (existingIndex >= 0) {
      users[existingIndex] = { ...users[existingIndex], ...newUserObj };
    } else {
      users.push(newUserObj);
    }
    saveUsers(users);

    res.json({
      success: true,
      message: `User ${cleanEmail} configured successfully with role ${newUserObj.role}`,
    });
  });

  // ==========================================
  // DRAFT VS PUBLISHED CONTENT ROUTES
  // ==========================================

  // Health check and versioning
  app.get('/api/health', (req: Request, res: Response) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
    res.json({
      status: 'ok',
      mode: isProduction ? 'production' : 'development',
      timestamp: Date.now(),
      serverTime: new Date().toISOString(),
    });
  });

  // GET Public Published Content (Visible to all public visitors on any device)
  app.get('/api/content', (req: Request, res: Response) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    const published = readPublishedContent();
    if (published) {
      return res.json({
        success: true,
        data: published,
        updatedAt: published.updatedAt || Date.now(),
        publishedAt: published.publishedAt || published.updatedAt || Date.now(),
      });
    }

    res.json({
      success: true,
      data: null,
      message: 'No published overrides, serving defaults',
    });
  });

  // GET Draft Content (Owner & Editor Only)
  app.get('/api/content/draft', requireAuth(['owner', 'editor']), (req: Request, res: Response) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
    const draft = readDraftContent() || readPublishedContent();
    const published = readPublishedContent();

    const hasUnpublishedChanges =
      draft && published ? (draft.updatedAt || 0) > (published.publishedAt || 0) : false;

    res.json({
      success: true,
      data: draft,
      updatedAt: draft?.updatedAt || Date.now(),
      publishedAt: published?.publishedAt || 0,
      hasUnpublishedChanges,
    });
  });

  // POST Draft Content (Owner & Editor Only - does NOT change public website until published)
  app.post('/api/content/draft', requireAuth(['owner', 'editor']), (req: Request, res: Response) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
    const payload = req.body;

    if (!payload || typeof payload !== 'object') {
      return res.status(400).json({ error: 'Invalid content payload' });
    }

    const currentDraft = readDraftContent() || readPublishedContent() || {};
    const updated = {
      ...currentDraft,
      ...payload,
      updatedAt: Date.now(),
    };

    const success = writeDraftContent(updated);
    if (!success) {
      return res.status(500).json({ error: 'Failed to write draft content to storage' });
    }

    res.json({
      success: true,
      updatedAt: updated.updatedAt,
      message: 'Draft updated successfully. Changes will remain in draft until published.',
    });
  });

  // POST Publish Content (Owner Only - Makes all draft changes live across all devices)
  app.post('/api/content/publish', requireAuth(['owner']), (req: Request, res: Response) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
    const draft = readDraftContent();

    if (!draft) {
      return res.status(400).json({ error: 'No draft content found to publish' });
    }

    const now = Date.now();
    const publishedPayload = {
      ...draft,
      publishedAt: now,
      updatedAt: now,
      publishedBy: (req as any).user.email,
    };

    const successPub = writePublishedContent(publishedPayload);
    const successDraft = writeDraftContent(publishedPayload);

    if (!successPub || !successDraft) {
      return res.status(500).json({ error: 'Failed to publish content to live website' });
    }

    console.log(`[Server] Live website PUBLISHED globally by ${(req as any).user.email} at ${new Date(now).toISOString()}`);

    res.json({
      success: true,
      publishedAt: now,
      message: 'Website published successfully! All devices now load this live published version.',
    });
  });

  // POST Discard Draft (Owner & Editor - Reverts draft back to current published state)
  app.post('/api/content/discard', requireAuth(['owner', 'editor']), (req: Request, res: Response) => {
    const published = readPublishedContent();
    if (published) {
      writeDraftContent(published);
    }
    res.json({
      success: true,
      message: 'Draft discarded. Reverted to live published content.',
    });
  });

  // POST /api/upload: Protected Upload (Owner & Editor Only)
  app.post('/api/upload', requireAuth(['owner', 'editor']), (req: Request, res: Response) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
    const { dataUrl, filename: originalName, folder = 'products' } = req.body;

    if (!dataUrl || typeof dataUrl !== 'string') {
      return res.status(400).json({ error: 'Missing or invalid dataUrl' });
    }

    // Is it image or document?
    if (dataUrl.startsWith('data:image/')) {
      const publicUrl = saveBase64Image(dataUrl, 'prod');
      if (!publicUrl) {
        return res.status(500).json({ error: 'Failed to decode and save image' });
      }
      return res.json({
        success: true,
        url: publicUrl,
        type: 'image',
      });
    }

    // General document / PDF
    try {
      const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
      if (!match) {
        return res.status(400).json({ error: 'Invalid base64 payload' });
      }

      const mime = match[1];
      const ext = originalName ? path.extname(originalName).replace('.', '') : 'pdf';
      const safeName = `doc_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${ext || 'pdf'}`;
      const buffer = Buffer.from(match[2], 'base64');

      const targetPath = path.join(PUBLIC_DOC_UPLOADS_DIR, safeName);
      fs.writeFileSync(targetPath, buffer);

      if (fs.existsSync(DIST_DIR)) {
        const distDocDir = path.resolve(DIST_UPLOADS_DIR, 'documents');
        if (!fs.existsSync(distDocDir)) fs.mkdirSync(distDocDir, { recursive: true });
        fs.writeFileSync(path.join(distDocDir, safeName), buffer);
      }

      return res.json({
        success: true,
        url: `/uploads/documents/${safeName}`,
        mime,
        type: 'document',
      });
    } catch (err) {
      console.error('[Server] Document upload failed:', err);
      return res.status(500).json({ error: 'Failed to process document' });
    }
  });

  // POST /api/sync-local: Automatically migrates client-side localStorage images into physical permanent assets (Protected)
  app.post('/api/sync-local', requireAuth(['owner', 'editor']), (req: Request, res: Response) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
    const { syncImageMap, localProducts } = req.body;

    let syncedCount = 0;
    const current = readDraftContent() || readPublishedContent() || {};
    const existingProducts: any[] = current.products || [];

    const productMap = new Map(existingProducts.map((p) => [p.id, p]));

    // 1. Process syncImageMap
    if (syncImageMap && typeof syncImageMap === 'object') {
      for (const [productId, media] of Object.entries(syncImageMap) as [string, any][]) {
        if (!media) continue;

        let permanentMain = media.mainImage;
        if (permanentMain && permanentMain.startsWith('data:image/')) {
          const savedUrl = saveBase64Image(permanentMain, `prod_${productId}`);
          if (savedUrl) {
            permanentMain = savedUrl;
            syncedCount++;
          }
        }

        let permanentGallery: string[] = [];
        if (Array.isArray(media.galleryImages)) {
          permanentGallery = media.galleryImages.map((img: string, idx: number) => {
            if (img && img.startsWith('data:image/')) {
              const savedUrl = saveBase64Image(img, `prod_${productId}_gal_${idx}`);
              if (savedUrl) {
                syncedCount++;
                return savedUrl;
              }
            }
            return img;
          });
        }

        const existing = productMap.get(productId);
        if (existing) {
          if (permanentMain && permanentMain.trim().length > 0) {
            existing.mainImage = permanentMain;
          }
          if (permanentGallery.length > 0) {
            existing.galleryImages = permanentGallery;
          }
        } else {
          productMap.set(productId, {
            id: productId,
            mainImage: permanentMain || '',
            galleryImages: permanentGallery,
          });
        }
      }
    }

    // 2. Process localProducts
    if (Array.isArray(localProducts)) {
      for (const prod of localProducts) {
        if (!prod || !prod.id) continue;

        let mainImg = prod.mainImage || '';
        if (mainImg.startsWith('data:image/')) {
          const saved = saveBase64Image(mainImg, `prod_${prod.id}`);
          if (saved) {
            mainImg = saved;
            syncedCount++;
          }
        }

        const existing = productMap.get(prod.id);
        if (existing) {
          productMap.set(prod.id, {
            ...existing,
            ...prod,
            mainImage: mainImg || existing.mainImage,
          });
        } else {
          productMap.set(prod.id, {
            ...prod,
            mainImage: mainImg,
          });
        }
      }
    }

    const updatedProductList = Array.from(productMap.values());
    current.products = updatedProductList;
    current.updatedAt = Date.now();
    writeDraftContent(current);

    console.log(`[Server] Synced ${syncedCount} images from local client storage to draft.`);

    res.json({
      success: true,
      syncedCount,
      updatedAt: current.updatedAt,
      products: updatedProductList,
    });
  });

  // ==========================================
  // FRONTEND MOUNTING & SPA ROUTING
  // ==========================================

  if (!isProduction) {
    // Development mode: Mount Vite middleware
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port: PORT,
      },
      appType: 'spa',
    });

    app.use(vite.middlewares);

    // SPA fallback in development
    app.use('*', async (req: Request, res: Response, next: NextFunction) => {
      const url = req.originalUrl;
      try {
        let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf8');
        template = await vite.transformIndexHtml(url, template);

        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e: any) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });
  } else {
    // Production mode: Serve built dist files with aggressive immutable caching for assets
    app.use(
      '/assets',
      (req: Request, res: Response, next: NextFunction) => {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        next();
      },
      express.static(path.resolve(DIST_DIR, 'assets'))
    );

    // Serve other static files in dist
    app.use(
      express.static(DIST_DIR, {
        index: false,
        setHeaders: (res: Response, filePath: string) => {
          if (filePath.endsWith('.html')) {
            res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
            res.setHeader('Pragma', 'no-cache');
            res.setHeader('Expires', '0');
          }
        },
      })
    );

    // SPA fallback in production: guarantees direct page refreshes on any route load latest version
    app.use('*', (req: Request, res: Response) => {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      res.sendFile(path.resolve(DIST_DIR, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Server] SHRI DURGA STEELS full-stack server running on http://0.0.0.0:${PORT} (${isProduction ? 'Production' : 'Development'})`);
  });
}

startServer().catch((err) => {
  console.error('[Server] Fatal startup error:', err);
  process.exit(1);
});
