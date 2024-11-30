import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function ({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<main className="grow">
				<SidebarTrigger />
				<span>SHOGHLY</span>
				{children}
			</main>
		</SidebarProvider>
	);
}
