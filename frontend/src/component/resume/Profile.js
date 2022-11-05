const Profile = ({profiles}) => {

    return <ul style={{textAlign: 'justify', paddingLeft:26, paddingRight: '6px'}}>
        {profiles.map((item, index) => <li key={index}>{item}</li>)}
    </ul>
}

export default Profile;