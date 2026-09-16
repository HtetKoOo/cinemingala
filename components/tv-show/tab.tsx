"use client"

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { ReactNode } from "react"

interface TabItem {
    label: string
    value: string
    content: ReactNode
}

interface TvShowTabsProps {
    defaultValue?: string
    tabs: TabItem[]
    className?: string
}

export function TvShowTabs({ defaultValue, tabs }: TvShowTabsProps) {
    return (
        <div className="flex w-full flex-col gap-6">
            <Tabs defaultValue={defaultValue ?? tabs[0]?.value}>
                <TabsList className="flex flex-wrap sm:flex-nowrap w-full overflow-x-auto bg-muted rounded-2xl">
                    {tabs.map((tab) => (
                        <TabsTrigger
                            key={tab.value}
                            value={tab.value}
                            className="rounded-2xl px-2 py-2 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition"
                        >
                            {tab.label}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {tabs.map((tab) => (
                    <TabsContent key={tab.value} value={tab.value}>
                        {tab.content}
                    </TabsContent>
                ))}
            </Tabs>

        </div>
    )
}
