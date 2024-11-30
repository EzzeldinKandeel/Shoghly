export default function ({ children }: { children: React.ReactNode }) {
	return (
		<main className="grow">
			<div className="text-brand-prime-500 p-8 text-2xl font-thin tracking-widest">
				<span>SHOGHLY</span>
			</div>
			{children}
		</main>
	);
}
