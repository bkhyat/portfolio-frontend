const Profile = ({profiles}) => {

    return <ul>
        {profiles.map((item, index) => <li key={index}>{item}</li>)}
    </ul>
}

export default Profile;