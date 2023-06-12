import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import Miniature from '../Images/profilePictureTest.jpg';


const CardUser = ({ userId,profilPicture, userName, date }) => {
    const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const imageModule = await import(`../Images/${profilPicture}`);
        setImageSrc(imageModule.default);
      } catch (error) {
        console.error(error);
        setImageSrc(null);
      }
    };

    loadImage();
  }, [profilPicture]);
  return (
    <Link to={`/user/${userId}`} className="block underline-none">
      <div className="bg-white rounded-lg overflow-hidden p-4 mb-6 shadow-md flex max-w-lg">
      {imageSrc ? (
          <img className="w-[25%] h-auto max-w-[25%] max-h-64 min-h-64 object-cover " src={imageSrc}  />
        ) : (
          <img className="roundedw-[25%] h-auto max-w-[25%] max-h-64 min-h-64 object-cover" src={Miniature}  />
        )}        <div className="ml-4 flex flex-col justify-between flex-grow">
          <div>
            <div className="flex items-center mb-2 justify-center ">
              <div className='items-center justify-center flex'>
                <p className="text-3xl">{userName}</p>
              </div>
            </div>
            <div className="flex justify-between items-center mb-2">
              <p>{date}</p>
            </div>  
            <div className="text-description overflow-hidden whitespace-normal overflow-ellipsis">
              {/* {description} */}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardUser;