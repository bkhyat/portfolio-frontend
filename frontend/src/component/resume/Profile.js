const Profile = ({profiles}) => {

    return <ul>
        {profiles.map(item => <li>{item}</li>)}
    </ul>
}

export default Profile;