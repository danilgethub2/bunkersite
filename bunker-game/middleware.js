import { NextResponse } from 'next/server';

export function middleware(request) {
  // Если запрос идет на корень сайта, просто пропускаем его
  if (request.nextUrl.pathname === '/') {
    return NextResponse.next();
  }

  // Если запрос к файлу с расширением (js, css, etc.), пропускаем его
  if (request.nextUrl.pathname.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg)$/)) {
    return NextResponse.next();
  }

  // Для остальных маршрутов перенаправляем на корень с сохранением пути в параметре
  const url = request.nextUrl.clone();
  url.pathname = '/';
  url.search = `?path=${request.nextUrl.pathname}`;
  
  return NextResponse.redirect(url);
}

export const config = {
  matcher: '/:path*',
}; 