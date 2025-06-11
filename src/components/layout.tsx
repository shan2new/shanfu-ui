import * as React from "react"

import { Navigation, SidebarNavigation } from "./navigation"

export interface LayoutProps {
  children: React.ReactNode
  title?: string
  version?: string
  githubUrl?: string
  docsUrl?: string
  showSidebar?: boolean
  className?: string
}

export function Layout({
  children,
  title,
  version,
  githubUrl,
  docsUrl,
  showSidebar = true,
  className = "",
}: LayoutProps) {
  return (
    <div className={`min-h-screen bg-background font-sans antialiased ${className}`}>
      <Navigation
        title={title}
        version={version}
        githubUrl={githubUrl}
        docsUrl={docsUrl}
      />
      
      <div className="border-b">
        <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
          {showSidebar && (
            <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
              <div className="relative overflow-hidden h-full py-6 pr-6 lg:py-8">
                <SidebarNavigation />
              </div>
            </aside>
          )}
          
          <main className={`relative py-6 lg:gap-10 lg:py-8 ${showSidebar ? '' : 'xl:grid xl:grid-cols-[1fr_300px]'}`}>
            <div className="mx-auto w-full min-w-0">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
} 