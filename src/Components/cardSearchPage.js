import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import Miniature from '../Images/miniatureTest.jpg';


const CardSearchPage = ({ videoId,thumbnail, title, userName, views, date, userImage, description }) => {
    const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const imageModule = await import(`../Images/${thumbnail}`);
        setImageSrc(imageModule.default);
      } catch (error) {
        console.error(error);
        setImageSrc(null);
      }
    };

    loadImage();
  }, [thumbnail]);
  return (
    <Link to={`/video/${videoId}`} className="block underline-none">
      <div className="bg-white rounded-lg overflow-hidden shadow-md p-4 mb-6 flex max-w-4xl">
      {imageSrc ? (
          <img className="w-full h-auto max-w-full max-h-64 min-h-64 object-cover" src={imageSrc} alt={title} />
        ) : (
          <img className="rounded w-full max-h-64 min-h-64 object-cover" src={Miniature} alt={title} />
        )}        <div className="ml-4 flex flex-col justify-between flex-grow">
          <div>
            <div className="flex items-center mb-2">
              <img className="w-10 h-10 rounded-full mr-4" src={userImage} alt={userName} />
              <div>
                <h2 className="font-semibold text-lg">{title}</h2>
                <p className="text-gray-600">{userName}</p>
              </div>
            </div>
            <div className="flex justify-between items-center mb-2">
              <p>{views} vues</p>
              <p>{date}</p>
            </div>  
            <div className="text-description overflow-hidden whitespace-normal overflow-ellipsis">
              {description}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardSearchPage;