import { Heart } from 'lucide-react-native';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';

export default function LikeButton() {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const handleLike = () => setIsLiked((prevState) => !prevState);

  return (
    <TouchableOpacity onPress={handleLike} aria-label={isLiked ? 'Saved' : 'Unsaved'}>
      <Heart size={24} color={`${isLiked ? 'red' : 'gray'}`} />
    </TouchableOpacity>
  );
}
