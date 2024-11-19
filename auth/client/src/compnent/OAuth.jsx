import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { Signinsucces } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";



export default function OAuth() {
  const dispatch = useDispatch();

    const handleGoogleClick = async () => {
   try{
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      // Kullanıcı bilgilerini alalım
      
      const res = await fetch('/api/auth/google',{
        method : 'POST',
        headers:{
          'Content-Type' : 'application/json',
        }, 
        body : JSON.stringify({
          name : result.user.displayName,
          email : result.user.email,
          photo : result.user.photoURL,

        }),
      });
      
      const data = await res.json();
      dispatch(Signinsucces(data));

      console.log(result);
      console.log(data.username);
      console.log(data.pa)
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useNavigate('/');
        }catch(error){
            console.log("could not login with Google",error);
        }
        
    };

  return (
    <button onClick={handleGoogleClick} type='button' className='bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-90'>Continue with Google</button>

    

)
}
