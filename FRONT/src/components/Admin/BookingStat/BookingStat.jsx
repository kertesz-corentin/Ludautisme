import React from 'react';
import PropTypes from 'prop-types';
import api from '../../../requests';
import { toast } from 'react-toastify';
import Highcharts from 'highcharts/highstock';
import BarChart from "highcharts-react-official";

const BookingStat = ({ className, ...rest }) => {
    const [stat, setStat] = React.useState([]);
    const options = {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Emprunts par mois'
        },
        xAxis: {
            type: 'category',
            title: {
                text: null
            },
            min: 0,
            max: 4,
            scrollbar: {
                enabled: true
            },
            tickLength: 0
        },
        yAxis: {
            allowDecimals: false,
            title: {
                text: "Nombre d'emprunts",
                align: 'high'
            }
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        series: [{
            name: "emprunts",
            data: stat
        }]
    };

    const getStat = async () => {
        let path = '/admin/stat/booking';
        try {
            const response = await api.get(path);
            if (response.status === 200) {
                let rows = [];
                for (const row of response.data) {

                    let rowObject = {
                        y: Number(row.count),
                        name: row.to_char
                    }
                    rows.push(rowObject);
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
            <BarChart
                highcharts={Highcharts}
                options={options}
            />
        </div>
    );
}

BookingStat.propTypes = {
    className: PropTypes.string,
};
BookingStat.defaultProps = {
    className: '',
};

export default React.memo(BookingStat);
