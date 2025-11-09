import LoadDataButton from './load-data-button'

const Header = () => {
  return (
    <header className="pb-18 pt-4 rounded-lg bg-gray-900 m-2">
      <nav className="container flex justify-between gap-4 items-center relative mb-12">
        <a
          href="https://www.jetbrains.com"
          className="p-2 bg-gray-100 rounded-lg"
        >
          <img
            src="https://resources.jetbrains.com/storage/products/company/brand/logos/jetbrains.png"
            alt="JetBrains"
            className="sm:h-8 h-5 w-auto"
            width={816}
            height={175}
          />
        </a>
        <a
          className="text-sm sm:text-base font-semibold underline underline-offset-2 hover:no-underline"
          href="https://savicaleksa.com"
          target="_blank"
        >
          PORTFOLIO
        </a>
      </nav>
      <div className="container">
        <div className="text-center space-y-4 lg:space-y-8">
          <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            Survey Visualizer Integration
          </h1>
          <p className="sm:text-lg lg:text-xl">
            Interactive visualization of data from the Open Trivia DB
          </p>
          <LoadDataButton />
        </div>
      </div>
    </header>
  )
}

export default Header
