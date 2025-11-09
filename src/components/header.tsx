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
          href="https://github.com/savicaleksa/survey-visualizer-integration"
          target="_blank"
        >
          GITHUB SOURCE
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
          <div className="flex flex-col items-center gap-4">
            <LoadDataButton />
            <a
              href="https://github.com/savicaleksa/survey-visualizer-integration"
              className="py-2 px-4 bg-pink-200 disabled:opacity-50 disabled:pointer-events-none text-pink-950 hover:bg-pink-100 font-semibold cursor-pointer hover: rounded-lg"
            >
              View source code
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
