import React from 'react';
import DiscordIcon from '../assets/discord.svg';
import MirrorIcon from '../assets/mirror.svg';
import TwitterIcon from '../assets/twitter.svg';
import DiscordHoverIcon from '../assets/discord_hover.svg';
import MirrorHoverIcon from '../assets/mirror_hover.svg';
import TwitterHoverIcon from '../assets/twitter_hover.svg';
import HoverImageButton from './HoverImageButton';

const Footer = (props) => {
	const {activePage} = props;

  const nofooter = "";
	return (
		<>
      {!nofooter.includes(activePage) &&
        <div className={`mt-auto w-full bg-gray-500 py-8`}>
          <div className={`max-w-7xl mx-auto px-2 sm:px-6 lg:px-8`}>
            <div className="relative flex items-center justify-center h-16">
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-center">
                <HoverImageButton className="h-10 mx-4 cursor-pointer" onDragStart={(e) => e.preventDefault()} onClick={() => {window.open('https://discord.gg/EXd9jj9f2A', '_blank');}} defaultSrc={DiscordIcon} hoverSrc={DiscordHoverIcon} />
                <HoverImageButton className="h-10 mx-4 cursor-pointer" onDragStart={(e) => e.preventDefault()} onClick={() => {window.open('https://twitter.com/madxyz_', '_blank');}} defaultSrc={TwitterIcon} hoverSrc={TwitterHoverIcon} />
                <HoverImageButton className="h-10 mx-4 cursor-pointer" onDragStart={(e) => e.preventDefault()} onClick={() => {window.open('https://mirror.xyz/0x91a567BbFF43d384bAf168893FBba570b0c96b0c', '_blank');}} defaultSrc={MirrorIcon} hoverSrc={MirrorHoverIcon} />
              </div>
            </div>
          </div>
        </div>
      }
		</>
	);
}

export default Footer;
