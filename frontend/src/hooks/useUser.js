import { useState } from 'react';

export default function useUser() {
  const [user, setUser] = useState({});
  const [isAuth, setIsAuth] = useState(false);

  return {
    isAdmin: user.role === 'ADMIN',
    id: user.id,
    isAuth,
    setUser,
    setIsAuth,
  };
}
