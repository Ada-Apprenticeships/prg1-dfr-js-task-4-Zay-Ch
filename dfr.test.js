const { fileExists, validNumber, dataDimensions, calculateMean, findTotal, convertToFloat, flatten, 
    loadCSV, calculateMedian, createSlice } = require('./dfr.js');

// Run the tests by typing npm test in the terminal below


describe('Dataframe function tests', () => {
    test("T01_FileExistsFunction", async function() {
        expect( fileExists('./assets/testing/datatrafficdataset_10.csv') ).toBe( true );
        expect( fileExists('./assets/testing/invalidfile.csv') ).toBe( false );
        expect( fileExists('') ).toBe( false );
      });

    test("T02_ValidNumberFunction", async function() {
    validnumbers = [ 0, 1, 100, 1000, 10000, -1, -100, 0.1, 1.1, 100.100, -1000, -1.1 ]
        invalidnumbers = [ '10+', '1_0','1A', 'A1', '+100', '','A', '-1-', '0.1.', '+-1.1', '.', '5.', '1-', '1-.', '-', '+' ]
    
        for ( let n of validnumbers){
            expect( validNumber ( n ) ).toBe( true );
        }
    
        for ( let n of invalidnumbers){
            expect( validNumber ( n ) ).toBe( false );
        }
    
    });

    test("T03_DataDimension", async function() {
        let _df1 = [
            [ 'tcp', 1, 2, 3 ],
            [ 'icmp', 4, 5, 6 ],
            [ 'tcp', 7, 8, 9 ],
        ]
        let _df2 = [
            [ 1, 2, 3 ],
            [ 4, 5, 6 ],
            [ 7, 8, 9 ],
        ]
        let _ds1 = [ 13 , 14 , 15 ]
        let _ds2 = [ 'aaaaa' , 'bbbbb' , 'ccccc' ]
        let _ds3 = ''
        let _ds4 = undefined
        
            
        expect( dataDimensions(_df1) ).toMatchObject([  3  , 4 ] );
        expect( dataDimensions(_df2) ).toMatchObject([  3  , 3 ] );
        expect( dataDimensions(_ds1) ).toMatchObject([  3  , -1 ] );
        expect( dataDimensions(_ds2) ).toMatchObject([  3  , -1 ] );
        expect( dataDimensions(_ds3) ).toMatchObject([  -1  , -1 ] );
        expect( dataDimensions(_ds4) ).toMatchObject([  -1  , -1 ] );
      
    });

    test("T04_ConvertFloat", async function() {
        let _df1 = [
          [ 'tcp', 1, '2', 3 ],
          [ '1.2', 4, '5', 6 ],
          [ 'tcp', 7, 8, '9' ]
        ]
        
        // 0 Col
        expect( convertToFloat(_df1, 0) ).toBe( 1 );
        expect( typeof(_df1[0][0]) ).toBe( 'string' );
        expect( typeof(_df1[1][0]) ).toBe( 'number' );
        expect( typeof(_df1[2][0]) ).toBe( 'string' );
        
        expect( _df1[0][0] ).toBe( 'tcp' );
        expect( _df1[1][0] ).toBe( 1.2 );
        expect( _df1[2][0] ).toBe( 'tcp' );
        
        // 2 Col
        expect( convertToFloat(_df1, 2) ).toBe( 2 );
        expect( typeof(_df1[0][2]) ).toBe( 'number' );
        expect( typeof(_df1[1][2]) ).toBe( 'number' );
        
        expect( _df1[0][2] ).toBe( 2 );
        expect( _df1[1][2] ).toBe( 5 );
        expect( _df1[2][2] ).toBe( 8 );
      
        // 3 Col
        expect( convertToFloat(_df1, 3) ).toBe( 1 );
        expect( typeof(_df1[2][3]) ).toBe( 'number' );
        
        expect( _df1[0][3] ).toBe( 3 );
        expect( _df1[1][3] ).toBe( 6 );
        expect( _df1[2][3] ).toBe( 9 );
      
    });

    test("T05_CalculateMeanAverage", async function() {
        let _ds1 = [ 10, 20, -5.5, 0.5, 'AA', 10, 25 ]
        let _ds2 = [ -5.5 ]
        let _ds3 = [ '-5.5' ]
        let _ds4_FALSE = [ _ds1 ]
        let _ds5_FALSE = [ ]
        let _df6 = [ 1.5, 1.9, 10.0, 50, -10, '3', '1' ]
        
        expect( calculateMean(_ds1) ).toBe( 10.0 );
        expect( calculateMean(_ds2) ).toBe( -5.5 );
        expect( calculateMean(_ds3) ).toBe( -5.5 );
        expect( calculateMean(_ds4_FALSE) ).toBe( false );
        expect( calculateMean(_ds5_FALSE) ).toBe( false );
        expect( calculateMean(_df6) ).toBe( 8.2 );
        
        let _mean = calculateMean( _ds2 )
        expect( typeof(_mean) ).toBe( 'number' );
      
    });
        
    test("T06_FindTotal", async function() {
        let _ds1 = [ 1.5, 1.9, 'AA', 10.0, 44.02, 50, -10, '3', '1' ]
        let _ds2_FALSE = [ [ 0 ] ]
        let _ds3_FALSE = ""
        let _ds4 = [ 1 ]
         
        expect( findTotal(_ds1) ).toBe( 101.42 );
        expect( findTotal(_ds2_FALSE) ).toBe( false );
        expect( findTotal(_ds3_FALSE) ).toBe( false );
        expect( typeof (findTotal(_ds1)) ).toBe( 'number' );
        
        expect( findTotal(_ds4) ).toBe( 1.0 );
        expect( typeof (findTotal(_ds4)) ).toBe( 'number' );
      
      
    });

    test("T07_CalculateMedian", async function() {
        let _ds1 = [ 1.5, 1.9, 10.0, 50, -10, 3, 1, 3, 55, 20 ] 
        let _ds2 = [ 33, 3.4, 33.4, 55, 4, 43, 56 ] 
        let _ds3 = [ 17, 10, 15, 17 ] 
        let _ds4 = [ 17, 10, 18, 15, 17 ] 
        let _ds5 = [ 17, 10, '18', 15, '', 17, 'AA' ]
        let _ds6 = [ '19' ]
        let _ds7_FALSE = [ ] 
          
        expect( calculateMedian (_ds1)).toBe( 3.0 )
        expect( calculateMedian (_ds2)).toBe( 33.4 )
        expect( calculateMedian (_ds3)).toBe( 16.0 )
        expect( calculateMedian (_ds4)).toBe( 17.0 )
        expect( calculateMedian (_ds5)).toBe( 17.0 )
        expect( calculateMedian (_ds6)).toBe( 19.0 )
        expect( typeof (calculateMedian (_ds6)) ).toBe( 'number' )
        expect( calculateMedian (_ds7_FALSE) ).toBe( false )
      
    });

    test("T08_Flatten", async function() {
        let _df1 = [
            [ '99' ],
            [ 10 ],
            [ 20 ],
            [ 2.3 ],
            [ 0.7 ]
        ]
        let _df2 = [ '99', 10, 20, 2.3, 0.7 ]
        expect( flatten ( _df1 )).toMatchObject( _df2 );
        expect( flatten ( _df2 )).toMatchObject( [] );
      
    });

    test("T09_CreateSlice", async function() {
        let _df1 = [
            [ 'head0',  'head1',  'head2',  'head3'  ],
            [ 'tcp',     1,       2,         3       ],
            [ 'icmp',    4,       5,         6       ],
            [ 'tcp',     7,       8,         9       ],
          ]
          
        let _df1_1 = createSlice ( _df1 , 0 , 'icmp' , [ 0 , 2 ] )   //-> [['icmp', 5]]
        let _df1_2 = createSlice ( _df1 , 0 , 'tcp' , [ 0 , 2 ] )    //-> [['tcp', 2], ['tcp', 8]]
        let _df1_3 = createSlice ( _df1 , 0 , 'tcp' )                //-> [['tcp', 1, 2, 3], ['tcp', 7, 8, 9]]
        let _df1_4 = createSlice ( _df1 , 1 , '*' )                  //-> [['head0', 'head1', 'head2', 'head3'], ['tcp', 1, 2, 3], ['icmp', 4, 5, 6], ['tcp', 7, 8, 9]]
        let _df1_5 = createSlice ( _df1 , 2 , 8, [ 2, 3 ] )          //-> [[8, 9]]
          
        expect( _df1_1 ).toMatchObject( [['icmp', 5]] );
        expect( _df1_2 ).toMatchObject( [['tcp', 2], ['tcp', 8]] );
        expect( _df1_3 ).toMatchObject( [['tcp', 1, 2, 3], ['tcp', 7, 8, 9]] );
        expect( _df1_4 ).toMatchObject( [['head0', 'head1', 'head2', 'head3'], ['tcp', 1, 2, 3], ['icmp', 4, 5, 6], ['tcp', 7, 8, 9]] );
        expect( _df1_5 ).toMatchObject( [[8, 9]] );
      
    });

    test("T10_LoadCSV_IgnoringRowsCols_PatternMatched", async function() {
        let _ignorerows = [ 0 ]; // no headers 
        let _ignorecols = [ 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19 ]; // only cols 0, 1, & 20 should be loaded
        let _sourcefile = './assets/testing/datatrafficdataset_10.csv' // 11 rows, 21 columns
        
        let [dataframe, rows, cols ] = loadCSV ( _sourcefile, _ignorerows , _ignorecols )
        expect( rows ).toBe( 11 ) // check source file rows
        expect( cols ).toBe( 21 ) // check source file cols
      
      });

    test("T11_LoadCSV_IgnoringRowsCols_PatternMatchedColumnSlice_Flattened_Calculated", async function() {
        let _ignorerows = [ 0 ]; // no headers 
        let _ignorecols = [ 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19 ]; // only cols 0, 1, & 20 should be loaded
        let _sourcefile = './assets/testing/datatrafficdataset_10.csv' // 11 rows, 21 columns
          
        let [dataframe, rows, cols ] = loadCSV ( _sourcefile, _ignorerows , _ignorecols )
        expect( rows ).toBe( 11 ) // check source file rows
        expect( cols ).toBe( 21 ) // check source file cols
        
        expect( dataframe[0] ).toMatchObject( ['tcp', '0', 'neptune'] ); // sample the expected loaded data
        expect( dataframe[2] ).toMatchObject( ['icmp', '1032', 'smurf'] );
        expect( dataframe[5] ).toMatchObject( ['icmp', '520', 'smurf'] );
        expect( dataframe[9] ).toMatchObject( ['tcp', '325', 'normal'] );
        
        expect( dataDimensions (dataframe) ).toMatchObject( [10, 3] ); // check loaded dimensions based on the ignore
        
        // create a slice with only 'icmp' values and only col 2 (base 0 means actual col 1) 'source bytes'
        let _df1 = createSlice ( dataframe , 0 , 'icmp' , [ 1 ] ) // --> [['1032'], ['520'], ['1032']]
        expect( _df1 ).toMatchObject( [['1032'], ['520'], ['1032']] ); // confirm slice
        
        let _df1_flat = flatten ( _df1 ) // --> ['1032', '520', '1032']
        expect( _df1_flat ).toMatchObject( ['1032', '520', '1032'] ); // confirm flat values
        
        let _sourcebytes_icmp = findTotal (_df1_flat) // --> 2584.0
        expect( _sourcebytes_icmp ).toBe( 2584.0 ) // check final value
      
      }); 
      

});