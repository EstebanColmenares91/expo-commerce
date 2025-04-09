import { useWishlistStore } from 'core/store/wishlist';
import { Heart } from 'lucide-react-native';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';

export default function LikeButton() {
  const { isInWishlist } = useWishlistStore();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const handleLike = () => setIsLiked((prevState) => !prevState);

  return (
    <TouchableOpacity onPress={handleLike} aria-label={isLiked ? 'Saved' : 'Unsaved'}>
      <Heart size={24} fill={`${isLiked ? 'red' : 'gray'}`} />
    </TouchableOpacity>
  );
}
