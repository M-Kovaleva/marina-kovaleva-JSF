interface StarRatingProps {
  rating: number
  showCount?: boolean
  className?: string
}

function StarRating({ rating, showCount = false, className = '' }: StarRatingProps) {
  const filledStars = Math.round(rating)

  return (
    <div
      className={`product-card-rating ${className}`.trim()}
      aria-label={`Rating ${rating} out of 5`}
    >
      {'★'.repeat(filledStars)}
      {showCount && ` (${rating})`}
    </div>
  )
}

export default StarRating