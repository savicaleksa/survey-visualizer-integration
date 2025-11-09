const Footer = () => {
  return (
    <footer className="py-12 m-2 rounded-lg bg-gray-800">
      <div className="container">
        <p className="text-center text-gray-300">
          Built with 🤍 by{' '}
          <a
            href="https://savicaleksa.com"
            className="underline underline-offset-2 font-semibold hover:no-underline"
            target="_blank"
          >
            Aleksa Savić
          </a>
          . Data sourced from the{' '}
          <a
            href="https://opentdb.com"
            className="underline underline-offset-2 font-semibold hover:no-underline"
            target="_blank"
          >
            Open Trivia Database
          </a>
          .
        </p>
      </div>
    </footer>
  )
}
// https://opentdb.com
export default Footer
