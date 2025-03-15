export { default } from 'next-auth/middleware';

// export default withAuth({
//   jwt: { decode: authOptions.jwt?.decode },
//   callbacks: {
//     authorized: ({ token }) => !!token,
//   },
//   pages: {
//     signIn: '/get-started',
//   },
// });

export const config = { matcher: ['/skincare-questionnaire/:id*'] };
