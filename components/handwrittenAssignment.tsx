'use client'

const HandwrittenAssignment = (props:propsType) => {
    return (
        <div className="collapse collapse-arrow bg-base-200">
            <input type="radio" name={props.radioGroup} />
            <div className="collapse-title text-xl font-medium">Assignment Writing
                <hr />
            </div>

            <div className="collapse-content">
                <p>hello</p>
            </div>

        </div>
    )
}

export default HandwrittenAssignment

interface propsType {
    radioGroup: string
}