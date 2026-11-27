import { Link } from 'react-router-dom'

/** Uses the lockup cropped from the published poster (WebP copy of the PNG). Swap in the official file when supplied. */
export function Logo() {
  return (
    <Link to="/" className="brand" aria-label="KLINQ Cocktails and Cuisine, home">
      <img src="/brand/klinq-lockup-cropped-from-poster.webp" alt="" width={270} height={110} />
    </Link>
  )
}
