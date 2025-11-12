"use client"

import * as React from "react"
import {
  SquareTerminal,
  Sigma
} from "lucide-react"

import { NavMain } from "@/components/app/nav-main"
import { NavUser } from "@/components/app/nav-user"
import { TeamSwitcher } from "@/components/app/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  
  navMain: [
    {
      title: "Abc",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Abcedaris",
          url: "/dash/abcedaris",
        },{
          title: "Hora",
          url: "/dash/hora",
        }
      ],
    },
    {
      title: "Matemàtiques",
      url: "#",
      icon: Sigma,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
  ],
  
  
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
