import PropTypes from 'prop-types';
import React from 'react';
import api from '../../../requests';
import { toast } from 'react-toastify';

const UserStat = ({ className, ...rest }) => {
    const [stat, setStat] = React.useState([]);
    const getStat = async () => {
        let path = '/admin/stat/user';
        try {
            const response = await api.get(path);
            
            if (response.status === 200) {
                let rows = [];
                let index = 0;
                console.log(response.data);
                for (const row of response.data) {
                    
                    let rowObject = { 
                        id: index, 
                        value: row.count, 
                        label: row.name }
                    rows.push(rowObject);
                    index++
                }
                setStat(rows);
            } else {
                toast.error(response.data.message);
            }
        } catch (err) {
            toast.error(err.response.data.message);
        }
    }

    React.useEffect(() => {
        getStat();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
        </div>
    );
}

UserStat.propTypes = {
    className: PropTypes.string,
};
UserStat.defaultProps = {
    className: '',
};

export default React.memo(UserStat);
