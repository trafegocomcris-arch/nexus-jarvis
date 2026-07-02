export const config = { runtime: 'edge' };

export default async function handler(req) {
  const url = new URL(req.url);
  
  if(url.pathname !== '/' && url.pathname !== '/index.html'){
    return fetch(req);
  }

  const gk = process.env.NEXT_PUBLIC_GK || '';
  const cu = process.env.NEXT_PUBLIC_CU || '';

  const baseUrl = 'https://' + req.headers.get('host');
  
  try {
    const res = await fetch(baseUrl + '/index.html');
    let html = await res.text();
    
    html = html.replace(
      "window.__env={GK:'NEXT_PUBLIC_GK_PLACEHOLDER',CU:'NEXT_PUBLIC_CU_PLACEHOLDER'};",
      `window.__env={GK:'${gk}',CU:'${cu}'};`
    );
    
    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Permissions-Policy': 'microphone=*'
      }
    });
  } catch(e) {
    return new Response('Error: '+e.message, { status: 500 });
  }
}
