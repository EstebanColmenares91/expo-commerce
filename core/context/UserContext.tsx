import { User } from 'core/models/user.model';
import { removeAuthKey } from 'modules/auth/services/token.service';
import { createContext, useContext, useState } from 'react';

export interface AuthContextType {
  user: User | null;
  handleSignIn: (user: User) => void;
  handleSignOut: () => Promise<void>;
}

interface PropsWithChildren {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  handleSignIn: () => {},
  handleSignOut: () => Promise.resolve(),
});

/**
 * Hook para el contexto de usuario.
 * @returns () => AuthContextType
 */
export const useSession = (): AuthContextType => useContext(AuthContext);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);

  const handleSignIn = (user: User) => {
    setUser(user);
  };

  const handleSignOut = async () => {
    setUser(null);
    await removeAuthKey();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        handleSignIn,
        handleSignOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
