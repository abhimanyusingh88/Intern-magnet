export default function AgeSelect({ filters, handleChange, selectClasses }: any) {
    return <select
        value={filters.jobAge || ''}
        onChange={(e) => handleChange('jobAge', e.target.value ? Number(e.target.value) : undefined)}
        className={selectClasses}
    >
        <option value="">Any time</option>
        <option value="1">Last 24 hours</option>
        <option value="3">Last 3 days</option>
        <option value="7">Last week</option>
        <option value="30">Last month</option>
    </select>
}