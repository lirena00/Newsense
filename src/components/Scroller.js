import Link from "next/link"; 
import Gemini from "./Gemini"; 

export default function Scroller({ articles }) {
    return (
        <div className="container flex flex-col w-full gap-4 h-screen mt-12 p-4 snap-y snap-mandatory overflow-scroll">
            {articles.articles.map((link, index) => (
                <div key={index} className="block w-full max-w-2xl h-[85vh] snap-center border border-white rounded-md mx-auto p-4 text-center text-lg font-medium relative">
                    <img src={link.image} alt={link.title} className="w-full h-[35vh] object-cover rounded-lg" />
                    <div className="flex text-sm p-2 gap-2 items-center">
                        {link.tags.map((tag, index) => (
                            <div key={index} className="flex items-center px-2 py-1 rounded text-xs bg-black/30 backdrop-blur-md text-white border border-action">{tag}</div>
                        ))}
                        <div className="text-text">
                            {new Date(link.time).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: '2-digit'
                            })} | {new Date(link.time).toLocaleTimeString('en-US', {
                                hour: 'numeric',
                                minute: 'numeric'
                            }).replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")}
                        </div>
                    </div>
                    <p className="text-primary">{link.title}</p>
                    <Gemini input={link.full_article} short={link.description} />
                    <p className="text-xs p-2 text-left bottom-0 absolute">Read full article at <Link href={link.full_article} className="text-primary" target="_blank">{link.source}</Link></p>
                    <p className="text-xs p-2 right-3 bottom-0 absolute">{index+1}/{articles.articles.length}</p>
                </div>
            ))}
        </div>
    );
}
