import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const matcher = createRouteMatcher([
  '/',
  '/meetings(.*)',
]);

export default clerkMiddleware((auth, req) => {
  if (matcher(req)) auth().protect();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};