import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  const HOST = '0.0.0.0';
  const isProd = process.env.NODE_ENV === 'production';

  app.use(express.json());

  // Health check endpoint for Render / Cloud Run health probes
  app.get('/api/health', (_req: Request, res: Response) => {
    res.status(200).json({
      status: 'ok',
      service: 'Atelier Lumière Luxury Photography',
      environment: isProd ? 'production' : 'development',
      timestamp: new Date().toISOString(),
    });
  });

  // Booking & Consultation API endpoint
  app.post('/api/consultations', (req: Request, res: Response) => {
    const { clientName, email, phone, serviceId, preferredDate, location } = req.body;

    if (!clientName || !email || !phone) {
      res.status(400).json({
        error: 'Missing required consultation details (clientName, email, phone).',
      });
      return;
    }

    const referenceCode = `AL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    // In a production deployment, this can be piped directly to CRM, Firestore, or transactional email
    res.status(201).json({
      success: true,
      referenceCode,
      message: 'Consultation request received by Atelier Lumière Concierge.',
      data: {
        referenceCode,
        clientName,
        email,
        phone,
        serviceId,
        preferredDate,
        location,
        receivedAt: new Date().toISOString(),
      },
    });
  });

  if (!isProd) {
    // Development mode: Mount Vite middleware
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: {
        middlewareMode: true,
        host: HOST,
        port: PORT,
      },
      appType: 'spa',
    });

    app.use(vite.middlewares);
  } else {
    // Production mode: Serve pre-built static assets from /dist
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath, { maxAge: '1d' }));

    // SPA fallback: any unmatched route sends index.html
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, HOST, () => {
    console.log(`[Atelier Lumière] Server running on http://${HOST}:${PORT} (${isProd ? 'production' : 'development'})`);
  });
}

startServer().catch((err) => {
  console.error('[Atelier Lumière] Failed to start server:', err);
  process.exit(1);
});
