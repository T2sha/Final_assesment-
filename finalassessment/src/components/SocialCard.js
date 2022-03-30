const SocialCard = ({userData}) => {
return(
   <div>
       {userData.name.first}{userData.name.last}
   </div> 
)
};

export default SocialCard;