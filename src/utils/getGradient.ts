export const getGradient = ({
  ctx,
  position,
  colorStopOptions
}: {
  ctx: CanvasRenderingContext2D
  position: {
    x0: number
    x1: number
    y0: number
    y1: number
  }
  colorStopOptions: { offset: number; color: string }[]
}) => {
  //从上到下的渐变
  const gradient = ctx.createLinearGradient(position.x0, position.y0, position.x1, position.y1)
  colorStopOptions.forEach((colorStop) => {
    gradient.addColorStop(colorStop.offset, colorStop.color)
  })
  return gradient
}
