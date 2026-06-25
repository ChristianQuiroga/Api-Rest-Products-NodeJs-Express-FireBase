export const homeHtml = `
  <!DOCTYPE html>
  <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>API REST - Proyecto Final</title>

      <style>
        body {
          margin: 0;
          font-family: Arial, Helvetica, sans-serif;
          background-color: #f4f6f8;
          color: #333;
        }

        .container {
          max-width: 1000px;
          margin: 60px auto;
          padding: 40px;
          background-color: #ffffff;
          border-radius: 14px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
        }

        h1 {
          color: #1f3c88;
          margin-bottom: 10px;
        }

        h2 {
          color: #263238;
          margin-top: 35px;
          border-bottom: 2px solid #e5e7eb;
          padding-bottom: 8px;
        }

        .description {
          font-size: 1.1rem;
          color: #555;
          margin-bottom: 30px;
          line-height: 1.6;
        }

        .badge {
          display: inline-block;
          background-color: #e6f4ea;
          color: #137333;
          padding: 8px 14px;
          border-radius: 20px;
          font-weight: bold;
          margin-bottom: 20px;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 14px;
          margin-top: 20px;
        }

        .info-card {
          background-color: #f8fafc;
          padding: 16px;
          border-radius: 10px;
          border: 1px solid #e5e7eb;
        }

        .info-card strong {
          display: block;
          color: #1f3c88;
          margin-bottom: 6px;
        }

        .routes {
          margin-top: 25px;
        }

        .route {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          background-color: #f1f3f4;
          padding: 14px 18px;
          border-radius: 8px;
          margin-bottom: 12px;
          border-left: 5px solid #1f3c88;
        }

        .route-content {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .method {
          min-width: 70px;
          text-align: center;
          font-weight: bold;
          color: #ffffff;
          padding: 6px 10px;
          border-radius: 6px;
          font-size: 0.85rem;
        }

        .get {
          background-color: #1f7a8c;
        }

        .post {
          background-color: #137333;
        }

        .delete {
          background-color: #b3261e;
        }

        .path {
          font-family: Consolas, monospace;
          font-size: 0.98rem;
          color: #263238;
        }

        .protected {
          background-color: #fff4e5;
          color: #8a4b00;
          padding: 5px 10px;
          border-radius: 14px;
          font-size: 0.8rem;
          font-weight: bold;
          white-space: nowrap;
        }

        .public {
          background-color: #e6f4ea;
          color: #137333;
          padding: 5px 10px;
          border-radius: 14px;
          font-size: 0.8rem;
          font-weight: bold;
          white-space: nowrap;
        }

        .note {
          margin-top: 25px;
          padding: 16px;
          background-color: #eef3ff;
          border-left: 5px solid #1f3c88;
          border-radius: 8px;
          line-height: 1.5;
        }

        footer {
          margin-top: 35px;
          color: #777;
          font-size: 0.95rem;
          text-align: center;
        }
      </style>
    </head>

    <body>
      <main class="container">
        <span class="badge">API en funcionamiento</span>

        <h1>API REST - Proyecto Final Node.js</h1>

        <p class="description">
          Esta API fue desarrollada con Node.js y Express como parte del proyecto final del curso
          <strong>26134 - Back-End Node JS - Talento Tech</strong>.
          Permite gestionar productos y utilizar autenticación mediante JWT para proteger endpoints privados.
        </p>

        <section>
          <h2>Información del proyecto</h2>

          <div class="info-grid">
            <div class="info-card">
              <strong>Servidor</strong>
              Node.js
            </div>

            <div class="info-card">
              <strong>Framework</strong>
              Express
            </div>

            <div class="info-card">
              <strong>Autenticación</strong>
              JWT - JSON Web Token
            </div>

            <div class="info-card">
              <strong>Curso</strong>
              26134 - Back-End Node JS - Talento Tech
            </div>

            <div class="info-card">
              <strong>Profesor</strong>
              Jean Paul Ferreira
            </div>

            <div class="info-card">
              <strong>Autor</strong>
              Christian Quiroga Enriquez
            </div>
          </div>
        </section>

        <section class="routes">
          <h2>Endpoints disponibles</h2>

          <div class="route">
            <div class="route-content">
              <span class="method get">GET</span>
              <span class="path">/</span>
            </div>
            <span class="public">Público</span>
          </div>

          <div class="route">
            <div class="route-content">
              <span class="method post">POST</span>
              <span class="path">/api/auth/login</span>
            </div>
            <span class="public">Público</span>
          </div>

          <div class="route">
            <div class="route-content">
              <span class="method get">GET</span>
              <span class="path">/api/products</span>
            </div>
            <span class="public">Público</span>
          </div>

          <div class="route">
            <div class="route-content">
              <span class="method get">GET</span>
              <span class="path">/api/products/:id</span>
            </div>
            <span class="public">Público</span>
          </div>

          <div class="route">
            <div class="route-content">
              <span class="method get">GET</span>
              <span class="path">/api/products/sku/:idsku</span>
            </div>
            <span class="protected">Requiere token</span>
          </div>

          <div class="route">
            <div class="route-content">
              <span class="method post">POST</span>
              <span class="path">/api/products/create</span>
            </div>
            <span class="protected">Requiere token</span>
          </div>

          <div class="route">
            <div class="route-content">
              <span class="method delete">DELETE</span>
              <span class="path">/api/products/:id</span>
            </div>
            <span class="protected">Requiere token</span>
          </div>
        </section>

        <section class="note">
          <strong>Nota:</strong>
          Para utilizar los endpoints protegidos, primero se debe iniciar sesión en
          <span class="path">/api/auth/login</span> y luego enviar el token JWT en el header:
          <br />
          <span class="path">Authorization: Bearer &lt;token&gt;</span>
        </section>

        <footer>
          Proyecto final de curso - 26134 Back-End Node JS - Talento Tech
        </footer>
      </main>
    </body>
  </html>
`;
