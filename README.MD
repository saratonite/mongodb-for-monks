


## CRUD

+ CREATE    -   create(), save()
+ READ      -   find(), findOne(), findByid() 
+ UPDATE    -   update(), findAndUpdate(), findByIdAndUpdate()
+ DELETE    -   remove(), findAndRemove(), findByIdAndRemove()


## Operators

+ $inc - Increment opertor
    ```json
    {$inc:{ count: 1}}
    ```
+ $in - 
+ $nin - Not in
+ $eq
+ $gt
+ $gte
+ $lt
+ $lte
+ $ne


## Evaluation

+ $text - 

## Populating relations

### Populate single property
    ```
    .populate({
        path: 'blogPosts'
    })
    ```

### Populate tree
    .populate({
        path: 'blogPosts',
        populate: {
            path: 'comments',
            model: 'comment',
            populate: {
                path: 'user',
                model: 'user'
            }
        }
    })