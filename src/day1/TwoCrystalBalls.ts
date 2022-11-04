export default function two_crystal_balls(breaks: boolean[]): number {

	const jmpAmnt = Math.floor(Math.sqrt(breaks.length));
    
    let currJmp = jmpAmnt
    
    for (; currJmp < breaks.length; currJmp += jmpAmnt) {
        if (breaks[currJmp]) {
            break;
        }
    }
    
    currJmp -= jmpAmnt
    
    for (let j = 0; j < jmpAmnt && currJmp < breaks.length; ++j, ++currJmp) {
        if (breaks[currJmp]) {
            return currJmp
        }
    }
    
    return -1
}