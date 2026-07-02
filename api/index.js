export const config = { runtime: 'edge' };

export default async function handler(req) {
  const url = new URL(req.url);
  
  // Só interceptar a página principal
  if (url.pathname !== '/' && url.pathname !== '/index.html') {
    return fetch(req);
  }

  const gk = process.env.NEXT_PUBLIC_GK || '';
  
  // Buscar o HTML estático
  const staticUrl = new URL(req.url);
  staticUrl.pathname = '/index.html';
  
  try {
    const res = await fetch('https://nexus-jarvis.vercel.app/index.html');
    let html = await res.text();
    
    // Injetar a key
    html = html.replace(
      "window.__env={GK:'NEXT_PUBLIC_GK_PLACEHOLDER'};",
      `window.__env={GK:'${gk}'};`
    );
    
    return new Response(html, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
  } catch(e) {
    return new Response('Error', { status: 500 });
  }
}
