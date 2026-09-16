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
                <TabsList className="flex h-auto w-full snap-x snap-mandatory justify-start gap-1 overflow-x-auto rounded-2xl bg-muted p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-4 sm:overflow-visible">
                    {tabs.map((tab) => (
                        <TabsTrigger
                            key={tab.value}
                            value={tab.value}
                            className="min-w-30 flex-none snap-start rounded-xl px-3 py-2 text-sm font-medium transition data-[state=active]:bg-primary data-[state=active]:text-primary-foreground dark:data-[state=active]:bg-primary dark:data-[state=active]:text-primary-foreground sm:min-w-0 sm:flex-1"
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
