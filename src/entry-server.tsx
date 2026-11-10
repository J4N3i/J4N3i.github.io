import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { AppRoutes } from './App';
import { profile, SITE_URL } from './data';

export { SITE_URL };

export function render() {
  return ReactDOMServer.renderToString(
    <StaticRouter location="/">
      <AppRoutes />
    </StaticRouter>
  );
}

export function getNoscriptHtml() {
  return `
    <noscript>
      <div
        style="
          max-width: 600px;
          margin: 4rem auto;
          padding: 2rem;
          font-family: Inter, system-ui, sans-serif;
          color: #e6e8f0;
          background: #1a1f36;
          border-radius: 16px;
          text-align: center;
        "
      >
        <p style="font-size: 2rem; margin-bottom: 0.5rem"><strong>${profile.name}</strong></p>
        <p style="color: #b0b8d0; margin-bottom: 1rem">
          ${profile.role} · Final-year Computer Science undergraduate at SLIIT
        </p>
        <p style="color: #9ca3af; font-size: 0.9rem; margin-bottom: 1.5rem">
          ${profile.headline}
        </p>
        <p>
          <a href="${profile.githubUrl}" style="color: #7c6aff; margin-right: 1.5rem">GitHub</a>
          <a
            href="${profile.linkedinUrl}"
            style="color: #7c6aff; margin-right: 1.5rem"
            >LinkedIn</a
          >
          <a href="mailto:${profile.email}" style="color: #7c6aff">Email</a>
        </p>
      </div>
    </noscript>
  `.trim();
}
