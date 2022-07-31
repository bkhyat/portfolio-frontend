import ReactMarkdown from "react-markdown";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";

const MarkdownComponent = ({text}) => {
    const parseMD = () => {
        const elem = document.createElement('textarea');
        elem.innerHTML = text;
        return elem.value
    }
    return (
        <ReactMarkdown
            children={parseMD()}
            components={{
                code({node, inline, className, children, ...props}) {
                    const match = /language-(\w+)/.exec(className || '')
                    return !inline && match ? (
                        <SyntaxHighlighter
                            children={String(children).replace(/\n$/, '')}
                            language={match[1]}
                            PreTag="div"
                            {...props}
                        />
                    ) : (
                        <code className={className} {...props}>
                            {children}
                        </code>
                    )
                },
                img: ({node, ...props}) => <img style={{maxWidth: '100%'}}{...props} alt={"Screenshot"}/>
            }}
            linkTarget={'_blank'}
        />
    )
}

export default MarkdownComponent;