// An image as a choice selection
import { Option } from 'core/types'
import { WidgetProps } from '.'

interface ImageChoiceProps extends WidgetProps {
    src: string
    alt: string
    option: Option
    width?: number | string
    height?: number | string
}
declare function ImageChoiceType(props: ImageChoiceProps): JSX.Element

const ImageChoice: typeof ImageChoiceType = ({
    handler,
    option,
    tag,
    src,
    alt,
    className,
    width,
    height,
    isComplete
}: ImageChoiceProps) => {
    const onClick = !isComplete ? () => handler(option) : null
    return (
        <button
            onClick={onClick}
            data-tag={tag}
            data-option={option}
            className={`windrift--image-choice windrift--image-choice-chooseable-${isComplete} ${className}`}>
            <img src={src} alt={alt} width={width} height={height} />
        </button>
    )
}

export default ImageChoice
