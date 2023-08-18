import { NavBar, Footer } from '@/app/(components)/exports'

export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <>
        <NavBar />
            <main>{children}</main>
        <Footer />
        {/* <div>New Layout Element</div> */}
      </>
    )
  }