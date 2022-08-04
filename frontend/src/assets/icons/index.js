import Icon from "@ant-design/icons";
import stackOverflowIcon from '../images/stackoverflow-icon.png';

export const StackoverflowIcon = () => {

    return <Icon
        component={() => <img src={stackOverflowIcon} alt={'so'} height={15} width={15} style={{marginBottom: 5}}/>}
    />
}