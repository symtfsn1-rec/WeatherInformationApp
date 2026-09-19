export default function Footer() {
  return (
    <footer className="flex flex-col items-center p-4 bg-gray-900">
      <div className="flex justify-between items-center gap-8 mt-2 mb-4 bg-white rounded-full p-2">
        <a href="https://github.com/symtfsn1-rec" target="_blank" rel="noopener noreferrer">
          <img src="/github.svg" alt="GitHub Icon" className="w-7 h-7 hover:opacity-70" />
        </a>
        <a href="https://zenn.dev/zag" target="_blank" rel="noopener noreferrer">
          <img src="/zenn.svg" alt="Zenn Icon" className="w-7 h-7 hover:opacity-70" />
        </a>
      </div>
      <p className="text-white text-xs">Weather Information App.</p>
    </footer>
  )
}