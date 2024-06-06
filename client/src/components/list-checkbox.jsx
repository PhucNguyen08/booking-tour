/* eslint-disable react/prop-types */
import { Checkbox } from './ui/checkbox';

const ListCheckbox = ({ data, checkedList, setCheckedList }) => {
    return (
        <>
            {data.map(item => (
                <div key={item.id} className='flex items-center gap-1'>
                    <Checkbox
                        id={item.id}
                        checked={checkedList.includes(item.id)}
                        onCheckedChange={checked => {
                            return checked
                                ? setCheckedList([...checkedList, item.id])
                                : setCheckedList(
                                      checkedList.filter(
                                          value => value !== item.id
                                      )
                                  );
                        }}
                    />
                    <label htmlFor={item.id} className='text-sm text-[#4d4d4d]'>
                        {item.label}
                    </label>
                </div>
            ))}
        </>
    );
};

export default ListCheckbox;
