import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchUserDetail} from "../../rtk/stackoverflow/slices";


const StackoverflowProfile = () => {
    const {badge_counts, ...rest} = useSelector(state => state.stackoverflow.userDetail)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUserDetail())
    }, [])

    return <div>
        <img src={rest.profile_image} alt={"avatar"} height={60} width={60}/>
        {Object.keys(rest).map(key => <div key={key}>{key}:{rest[key]}</div>)}
    </div>
}

export default StackoverflowProfile;