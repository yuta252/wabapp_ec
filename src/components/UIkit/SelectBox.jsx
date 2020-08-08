import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    formControl: {
        marginBottom: 16,
        minWidth: 128,
        width: "100%"
    }
})


const SelectBox = (props) => {
    /**
     * Material UIのセレクトボックス
     * @parameters
     * props.label: String ラベル名
     * props.required: Boolean 入力欄を必須にするかどうか
     * props.rows: Int multiline=trueの場合に最初に何行テキストフィールドを見せるか
     * props.value: String セレクトフィールドに入力されている現在の値
     * props.select: function() セレクト欄が変更された時に実行する関数
     * props.options: Object
     *      option.id: Int　入力の選択肢に紐づくID
     *      option.name: String  入力の選択肢
    */
    const classes = useStyles();

    return (
        <FormControl className={classes.formControl}>
            <InputLabel>{props.label}</InputLabel>
            <Select
                required={props.required} value={props.value}
                onChange={ (event) => props.select(event.target.value) }
            >
                {props.options.map((option) => (
                    <MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default SelectBox