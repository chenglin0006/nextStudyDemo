import Header from './header';
import {Menu, Dropdown, Layout, Icon} from 'antd';

const layoutStyle = {
    margin: 20,
    padding: 20,
    border: '1px solid #DDD'
}

const LayoutIndex = (props) => (
    <div style={layoutStyle}>
        <Header />
        {props.children}
        <style jsx global>
            {`
                a:hover{
                    text-decoration:underline;
                }
            `}
        </style>
    </div>
)

export default LayoutIndex