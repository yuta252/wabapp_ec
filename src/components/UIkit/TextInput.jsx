import React from 'react';
import TextField from '@material-ui/core/TextField';

const TextInput = (props) => {
    /**
     * Material UIのテキスト入力
     * @parameters
     * props.fullWidth: Boolean 幅をmaxにするかmaxにしないか
     * 　true: 幅をmax  false: 幅をmaxにしない
     * props.multiline: Boolean 複数行の入力を可能にするかしないか
     * props.required: Boolean 入力欄を必須にするかどうか
     * props.rows: Int multiline=trueの場合に最初に何行テキストフィールドを見せるか
     * props.value: String テキストフィールドに入力されている現在の値
     * props.type: String HTMLのインプットタイプと同じ（text, email, password etc..)
     * props.onChange: function() テキストの入力が変更になった場合に実行する関数
    */
    return (
        <TextField
            fullWidth={props.fullWidth}
            label={props.label}
            margin="dense"
            multiline={props.multiline}
            required={props.required}
            rows={props.rows}
            value={props.value}
            type={props.type}
            onChange={props.onChange}
         />
    )
}

export default TextInput