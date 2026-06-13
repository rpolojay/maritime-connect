/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/index.php/contact', destination: '/contact', permanent: true },
      { source: '/index.php/about', destination: '/about', permanent: true },
      { source: '/about-2', destination: '/about', permanent: true },
      { source: '/apply-now', destination: '/apply', permanent: true },
      { source: '/apply-now-2', destination: '/apply', permanent: true },
      { source: '/home', destination: '/', permanent: true },
      { source: '/jobs/gcc-ca-1', destination: '/jobs', permanent: true },
      { source: '/jobs/sb-rsm-1', destination: '/jobs', permanent: true },
      { source: '/jobs/cunard-receptionist-1', destination: '/jobs', permanent: true },
      { source: '/jobs/cunard-sommelier-1', destination: '/jobs', permanent: true },
      { source: '/jobs/gcc-drw-1', destination: '/jobs', permanent: true },
      { source: '/jobs/gcc-co-1', destination: '/jobs', permanent: true },
      { source: '/jobs/po-bw-pc-1', destination: '/jobs', permanent: true },
      { source: '/jobs/po-aw-pc-1', destination: '/jobs', permanent: true },
      { source: '/jobs/11', destination: '/jobs', permanent: true },
      { source: '/job/cruise-ship-retail-sales-manager', destination: '/jobs', permanent: true },
      { source: '/job/cruise-ship-retail-sales-associate', destination: '/jobs', permanent: true },
      { source: '/job/cruise-ship-assistant-retail-sales-manager', destination: '/jobs', permanent: true },
      { source: '/job/cabin-attendant-cabin-steward-grand-circle-cruise-line-river-ships', destination: '/jobs', permanent: true },
      { source: '/retail-jobs', destination: '/jobs', permanent: true },
      { source: '/hospitality-jobs', destination: '/jobs', permanent: true },
      { source: '/cruise-ship-photographer', destination: '/cruise-ship-photographer-jobs', permanent: true },
      { source: '/reviews', destination: '/about', permanent: true },
      { source: '/employers/cunard-line', destination: '/for-employers', permanent: true }, { source: '/blog/salaries-2026', destination: '/blog/cruise-ship-salary-guide', permanent: true },
{ source: '/blog/top-10-best-cruise-lines-to-work-for-in-2026', destination: '/blog/how-to-get-cruise-ship-job', permanent: true },
{ source: '/blog/cruise-ship-salaries-2026-real-paychecks', destination: '/blog/cruise-ship-salary-guide', permanent: true },
{ source: '/signup', destination: '/apply', permanent: true },
{ source: '/training-partners', destination: '/training', permanent: true },
    ]
  },
}

module.exports = nextConfig
