import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchProfiles} from "../../rtk/resume/slices";


const Profile = () => {
    const {isLoading, profiles} = useSelector(state => state.resume.profiles)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchProfiles())
    }, [])

    return profiles.map(item => <div>{item}</div>)
}

export default Profile;